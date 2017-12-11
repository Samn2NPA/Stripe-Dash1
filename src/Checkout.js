import React, { button, Component } from 'react';

const defaultUrl = "https://api.stripe.com/v1";

export default class Checkout extends Component {

    constructor(props){
        super(props);
        this.state = {
            latestCharge: 'None'
        }
        this.createCharge = this.createCharge.bind(this);
    }

    createCharge(){
        const key = 'pk_test_Obwmz73MEeCdYR1G8l7431TY';
        const secretKey = 'sk_test_ZWaAcTswUoUkckGIjLcSuyAO';
        this.setState({
            latestCharge: "Creating token..." 
        }, () => {
            fetch(`${defaultUrl}/tokens`, {
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${key}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'card[number]=4242424242424242&card[exp_month]=02&card[exp_year]=2018'
            })
            .then((data) => data.json())
            .then((json) => {
                this.setState({
                    latestCharge: "Create charges..."
                });
                return fetch(`${defaultUrl}/charges`, {
                    method: 'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${secretKey}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `amount=2000&currency=usd&description=test&source=${json.id}`
                }) 
            })
            .then((data) => data.json())
            .then((json) => {
                this.setState({
                    latestCharge: json.id
                })
            })
        })
    }

    render() {
        return (
            <div>
                <h2>Checkout</h2>
                <button onClick={this.createCharge}>Charge</button>
                <p>latestCharge: {this.state.latestCharge}</p>
            </div>
        )
    }
}
