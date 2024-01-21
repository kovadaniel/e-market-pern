import {observer} from 'mobx-react-lite'
import { useContext } from 'react';
import { AppContext } from '../context/index'
import { ListGroup } from 'react-bootstrap';

const TypeBar = observer(() => {
    const {device} = useContext(AppContext)

    return (  
        <ListGroup>
            {device.types.map(type => 
                <ListGroup.Item 
                    key={type.id}
                    className='typebar-item'
                    active={type === device.selectedType}
                    onClick={() => device.setSelectedType(type)}
                >
                    {type.name}
                </ListGroup.Item>)}
        </ListGroup>
    );
})
 
export default TypeBar;