import React, { useState } from 'react';
import axiosInstance from '../../api/axiosConfig';

const Dashboard = () => {
  // Form & loading states
  const [ticker, setTicker] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Result states
  const [plots, setPlots] = useState({
    plot: null,
    dma100: null,
    dma200: null,
    prediction: null,
  });

  const [metrics, setMetrics] = useState({
    mse: null,
    rmse: null,
    r2: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    setPlots({ plot: null, dma100: null, dma200: null, prediction: null });
    setMetrics({ mse: null, rmse: null, r2: null });

    try {
      const response = await axiosInstance.post('stock/predict/', {
        ticker: ticker,
      });

      if (response.data.error) {
        setError(response.data.error);
        return;
      }

      const backendRoot = import.meta.env.VITE_BACKEND_ROOT?.replace(/\/$/, '');

      setPlots({
        plot: `${backendRoot}${response.data.plot_img}`,
        dma100: `${backendRoot}${response.data.plot_img_100dma}`,
        dma200: `${backendRoot}${response.data.plot_img_200dma}`,
        prediction: `${backendRoot}${response.data.plot_prediction}`,
      });

      setMetrics({
        mse: response.data.mse,
        rmse: response.data.rmse,
        r2: response.data.r2,
      });

    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Something went wrong. Please try again.');
      }
      console.error("API request failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container py-4'>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className='form-control'
              placeholder='Enter Stock Ticker (e.g. AAPL)'
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              required
            />
            {error && <div className='text-danger mt-2'>{error}</div>}

            <button
              type='submit'
              className='btn btn-info mt-3 w-100'
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Please wait...
                </>
              ) : (
                'See Prediction'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Results Section */}
      {plots.prediction && (
        <div className="row mt-5">
          <div className="col-12 text-center text-light mb-4">
            <h3>Results for <span className="text-warning">{ticker.toUpperCase()}</span></h3>
          </div>

          {Object.entries(plots).map(([label, url]) => (
            <div className="col-md-6 mb-4" key={label}>
              <div className="card shadow">
                <div className="card-header bg-dark text-white text-capitalize">
                  {label === 'dma100' ? '100 Day Moving Average' :
                   label === 'dma200' ? '200 Day Moving Average' :
                   label === 'prediction' ? 'Predicted Price' :
                   'Closing Price'}
                </div>
                <div className="card-body">
                  <img src={url} alt={label} className="img-fluid" />
                </div>
              </div>
            </div>
          ))}

          <div className="col-12 mt-4">
            <div className="card bg-secondary text-white">
              <div className="card-header">Model Evaluation</div>
              <div className="card-body">
                <p><strong>MSE:</strong> {metrics.mse}</p>
                <p><strong>RMSE:</strong> {metrics.rmse}</p>
                <p><strong>R²:</strong> {metrics.r2}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
