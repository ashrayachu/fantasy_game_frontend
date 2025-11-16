import AdImg from "../../assets/ad.jpg"

const AdBanner = () => {
    return (
        <div className="w-full">
            <div className="max-w-6xl mx-auto rounded-xl overflow-hidden">
                <img src={AdImg} className="w-full h-40 object-cover object" />
            </div>
        </div>
    );
};

export default AdBanner;