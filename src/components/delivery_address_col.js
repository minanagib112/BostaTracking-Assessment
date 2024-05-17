import question_mark from '../assets/images/question_mark.jpg';
import {Button, Col, Row} from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import './delivery_address_col.css';
import React from 'react';

function DeliveryAddressCol({address}) {
    
    const { t, i18n} = useTranslation();
    const activeLocale = i18n.resolvedLanguage;

    return (
        <div>
            <Row className='Address-box' style={activeLocale=='ar'?{textAlign:'right'}:{textAlign:'left'}}>
                <p style={{flexWrap:"wrap", width: "22vw"}}>
                    {address}
                    Customer's address
                </p>
            </Row>
            <Row className='Problem-box'>
                <Col className='Image-col'>
                    <img src={question_mark} alt='Question Mark' style={{width:"7vw"}}/>
                </Col>
                <Col className='Problem-col'>
                    <Row style={{flexWrap:"wrap", paddingBottom:"1vh", alignContent:"center"}}>
                    {t('problem_w_shipment')}
                    </Row>
                    <Button className='Problem-button'>{t('report_problem')}</Button>
                </Col>
            </Row>
        </div>
    );
};

export default DeliveryAddressCol;