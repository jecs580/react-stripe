import "bootswatch/dist/lux/bootstrap.min.css"
import './App.css';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
const stripePromise = loadStripe("pk_test_51Iet68IuBXk2i4dwWEPzrVyV0euSeQ05MzJtBkCQxOJhGhRK1SZRmH9JOKJZh5GimanaWyUrm44prq1OYpfyuY3A00VrdyxxnT");

const CheckoutForm=()=>{
  const stripe =  useStripe();
  const elements = useElements();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const {error,paymentMethod} = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    })
    if(!error){
      console.log(paymentMethod);
    }
  }
  return <form onSubmit={handleSubmit} className="card card-body">
    <img src="https://www.corsair.com/corsairmedia/sys_master/productcontent/CH-9102020-NA-K68_01.png" alt="k68 keyboard" className="img-fluid"/>
    <div className="form-group">
      <CardElement className="form-control"/>
    </div>
    <button className="btn btn-primary">Buy</button>
  </form>
}
function App() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container p-4">
        <div className="row">
          <div className="col-md-4 offset-md-4">
            <CheckoutForm/>
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default App;
