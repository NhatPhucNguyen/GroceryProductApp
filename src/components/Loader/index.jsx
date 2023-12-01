/* eslint-disable react/no-children-prop */
import ModalLayout from "../../layout/ModalLayout";
import { ThreeCircles } from "react-loader-spinner";
const Loader = () => {
    return (
        <ModalLayout
            children={
                <ThreeCircles
                    height="100"
                    width="100"
                    color="#ffffff"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="three-circles-rotating"
                    outerCircleColor=""
                    innerCircleColor=""
                    middleCircleColor=""
                />
            }
        />
    );
};

export default Loader;
