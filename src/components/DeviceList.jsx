import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Row } from "react-bootstrap";
import { AppContext } from "../context";
import DeviceItem from "./DeviceItem";

const DeviceList = observer(() => {
    const { store: { device } } = useContext(AppContext)
    return (  
        <Row>
            {device.devices && device.devices.map(d => 
                <DeviceItem key={d.id} device={d}/>)}
        </Row>
    );
})
 
export default DeviceList;