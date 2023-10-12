import Table from 'react-bootstrap/Table';
import { Button, Container, Image, Row, Col } from 'react-bootstrap';


function AppTable() {

const handleDelete = () =>{
    console.log('click');
}
    return (
        <>
        {/* <Table responsive="sm" width={30}>
            <tbody>
                <tr>
                    <td>
                        <Image src={img} alt='product image' fluid 
                        style={{width: '60px', height: '60px'}} />
                    </td>
                    <td className=''>
                     <p>
                        {title}
                    </p>
                    </td>
                    <td>
                        Rs. {price}
                    </td>
                    <td>
                        <Button variant='primary-outline' onClick={handleDelete}>
                            Delete
                        </Button>
                    </td>
                </tr>
            </tbody>
        </Table> */}
        
        </>
    );
}

export default AppTable;