import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Card, Row } from "react-bootstrap";
import { AppContext } from "../context";

const BrandBar = observer(() => {
    const {device} = useContext(AppContext);
    const filteredBrands = device?.brands.filter((b) => {
        if(device.selectedType.brands){
            if(!device.selectedType.brands?.includes(b.id)) {
                return false;
            } 
        }
        return true;
    });

    return (  
        <Row>
            {device && 
             filteredBrands.map(brand => 
                <Card 
                    key={brand.id} 
                    className={`p-3 me-2 mb-2 w-auto brandbar-item ${brand === device.selectedBrand && 'active'}`} 
                    onClick={() => device.setSelectedBrand(brand)}
                    >
                    {brand.name} 
                </Card>
            )}
        </Row>
    );
})
 
export default BrandBar;