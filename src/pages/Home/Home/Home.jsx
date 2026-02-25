import Banner from "../Banner/Banner";
import BecomeMerchant from "../BecomeMerchant/BecomeMerchant";
import Benefits from "../Benefits/Benefits";
import Clients from "../Clients/Clients";
import CustomerSaying from "../CustomerSaying/CustomerSaying";
import HowItWorks from "../HowItWorks/HowItWorks";
import Services from "../services/Services";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Services></Services>
            <Clients></Clients>
            <Benefits></Benefits>
            <BecomeMerchant></BecomeMerchant>
            <CustomerSaying></CustomerSaying>
        </div>
    );
};

export default Home;