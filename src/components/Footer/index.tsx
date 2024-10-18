import Rules from "../Rules";

const Footer = () => {
    return (
        <footer className="bg-orange-800 p-4 flex justify-between">
            <div data-testid="copyright">&copy; Diyako Qadri</div>
            <div className="w-[50%] max-w-[600px]"><Rules/></div>
        </footer>
    )
};

export default Footer
