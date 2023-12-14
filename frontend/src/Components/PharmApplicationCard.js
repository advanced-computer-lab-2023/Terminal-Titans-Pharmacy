import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const PharmacistCard = ({ pharmacist, onAccept, onReject }) => {
    return (
        <Card style={{ width: '18rem', margin: '10px' }}>
            <Card.Body>
                <Card.Title>{pharmacist.Name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{pharmacist.Email}</Card.Subtitle>
                <Card.Text>
                    Date of Birth: {pharmacist.DateOfBirth}
                    <br />
                    Hourly Rate: {pharmacist.HourlyRate}
                    <br />
                    Affiliation: {pharmacist.Affiliation}
                    <br />
                    Education: {pharmacist.EducationalBackground}
                </Card.Text>
                <Button variant="dark" style={{ background:'#212529', width: '100%' }} onClick={() => window.location.href=`/Health-Plus/adminViewReqPharm?Id=${pharmacist._id}`}>
                    View Pharmacist
                </Button>
                <Button variant="success" style={{ background:'#198754', width: '48%', marginRight: '4%', marginTop: '4%' }} onClick={() => onAccept(pharmacist.Username)}>
                    Accept
                </Button>
                <Button variant="danger" style={{  background:'#dc3545', width: '48%', marginTop: '4%' }} onClick={() => onReject(pharmacist.Username)}>
                    Reject
                </Button>
            </Card.Body>
        </Card>
    );
};

export default PharmacistCard;
