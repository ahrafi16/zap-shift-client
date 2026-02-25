import Banner from "../Banner/Banner";
import Clients from "../Clients/Clients";
import HowItWorks from "../HowItWorks/HowItWorks";
import Services from "../services/Services";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Services></Services>
            <Clients></Clients>
        </div>
    );
};

export default Home;