import React from 'react'
import Button from './Button'

const Main = () => {
  return (
    <>
        <div className="container">
            <div className="p-5 text-center bg-light-dark rounded">
                <h1 className='text-light'>Stock Prediction Portal</h1>
                <p className='text-light lead'>Accurate prediction of stock market returns is a very challenging task due to volatile and non-linear nature of the financial stock markets. With the introduction of artificial intelligence and increased computational capabilities, programmed methods of prediction have proved to be more efficient in predicting stock prices. In this work, Artificial Neural Network and Random Forest techniques have been utilized for predicting the next day closing price for five companies belonging to different sectors of operation.</p>
                <Button text='Login' class='btn btn-outline-info'/>
            </div>
        </div>
    </>
  )
}

export default Main