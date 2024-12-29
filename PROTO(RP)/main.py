from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
import json
import os
import random

app = Flask(__name__)

# Secret Key for Flask
app.config['SECRET_KEY'] = 'RapidAid@1234567890'


# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/cart')
def cart():
    return render_template('cart.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')


@app.route('/checkout', methods=['GET', 'POST'])
def checkout():
    return render_template('checkout.html')



@app.route('/order_confirmation', methods=['GET'])
def order_confirmation():
    order_id = request.args.get('orderId', 'No Order ID')
    return render_template('order_confirmation.html', order_id=order_id)

if __name__ == "__main__":
    app.run(debug=True)
