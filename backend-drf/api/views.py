from django.shortcuts import render
import os
from django.conf import settings
from rest_framework import views
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import StockPredictionSerializer
from rest_framework import status
from rest_framework.response import Response

import yfinance as yf
import pandas as pd
import numpy as np
# import matplotlib
# matplotlib.use('Agg')
import matplotlib.pyplot as plt
from datetime import datetime
from .utils import save_plot
from keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
from sklearn.metrics import r2_score






class StockPredictionAPIView(APIView):
    def post(self, request):
        serializer = StockPredictionSerializer(data=request.data)
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']
            
            now = datetime.now()
            start = datetime(now.year - 10, now.month, now.day)
            end = now
            df = yf.download(ticker, start, end)

            if df.empty:
                return Response({"error": "No Data found for given ticker."}, status=status.HTTP_404_NOT_FOUND)

            df = df.reset_index()
           # print(df)
            # Plot
            plt.switch_backend('AGG')
            plt.figure(figsize=(14,6))
            plt.plot(df['Close'], label='Closing Price')
            plt.title(f'Closing Price of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Price')
            plt.legend()
            plot_img_path = f'{ticker}_plot.png'
            plot_img = save_plot(plot_img_path)
            
            
            
            #100 days moving average
            da100 = df['Close'].rolling(100).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(14,6))
            plt.plot(df['Close'], label='Closing Price')
            plt.plot(da100,label='100 DMA')
            plt.title(f'100 days moving average of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Price')
            plt.legend()
            plot_img_path_100dma = f'{ticker}_100dma_plot.png'
            plot_img_100dma = save_plot(plot_img_path_100dma)
            
            #200 days moving average
            da200 = df['Close'].rolling(200).mean()
            plt.switch_backend('AGG')
            plt.figure(figsize=(14,6))
            plt.plot(df['Close'], label='Closing Price')
            plt.plot(da100, 'r', label='100 DMA')
            plt.plot(da200, 'g', label='200 DMA')
            plt.title(f'200 days moving average of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Price')
            plt.legend()
            plot_img_path_200dma = f'{ticker}_200dma_plot.png'
            plot_img_200dma = save_plot(plot_img_path_200dma)
            
            
            # spliting data into traning and testing dataset
            data_traing = pd.DataFrame(df['Close'][0:int(len(df)*0.70)])
            #data_traing = pd.DataFrame(df.Close[0:int(len(df)*70)])
            data_testing = pd.DataFrame(df['Close'][int(len(df)*0.70):])
            
            #Scaling down the data between 0 and 1
            scaler = MinMaxScaler(feature_range=(0,1))
            
            #load ML model
            model = load_model('stock_prediction_model.keras')
            
            #Preparing Test Data
            past_100_days = data_traing.tail(100)
            final_df = pd.concat([past_100_days,data_testing],ignore_index=True) 
            input_data = scaler.fit_transform(final_df)
            
            x_test = []
            y_test = []

            for i in range(100,input_data.shape[0]):
                x_test.append(input_data[i-100:i])
                y_test.append(input_data[i,0])

            x_test,y_test = np.array(x_test),np.array(y_test)
            
            # Making Predictions
            y_predicted=model.predict(x_test)
            
            #Revert the scaled prices to original price
            y_predicted = scaler.inverse_transform(y_predicted.reshape(-1,1)).flatten()
            y_test = scaler.inverse_transform(y_test.reshape(-1,1)).flatten()
            
            
            #Plot the final Prediction 
            
            plt.switch_backend('AGG')
            plt.figure(figsize=(12, 5))
            plt.plot(y_test, 'b', label='Original Price', linewidth=2)
            plt.plot(y_predicted, 'r', label='Predicted Price', alpha=0.6)
            plt.title(f'Final Prediction for {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Price')
            plt.legend()
            plot_img_path = f'{ticker}_final_prediction.png'
            plot_prediction = save_plot(plot_img_path)
            
            # Model Evaluation
            # Mean Squared Error (MSE)
            mse = mean_squared_error(y_test, y_predicted)
            # Root mean squared Error (RMSE)
            rmse = np.sqrt(mse)
            
            # R-Squared
            r2 = r2_score(y_test, y_predicted)
            
            
            
            
            
                        
            return Response({
                'status':'success',
                'plot_img':plot_img,
                'plot_img_100dma':plot_img_100dma,
                'plot_img_200dma':plot_img_200dma,
                'plot_prediction':plot_prediction,
                'mse':mse,
                'rmse':rmse,
                'r2':r2
                
                },
                status=status.HTTP_201_CREATED)
            