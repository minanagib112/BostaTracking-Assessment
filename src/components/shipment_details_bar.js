import { useTranslation } from "react-i18next";
import {Col, Row} from 'react-bootstrap';
import './shipment_details_bar.css';
import React from 'react';

function ShipmentDetailsBar ({id,state, lastUpdate, retailer, deliveryDate, color}) {

    const { t, i18n} = useTranslation();
    const activeLocale = i18n.resolvedLanguage;

    var style={color:color};
    
    return (
        <div style={{display:'flex', justifyContent:"center"}}>
            <Row className={'Details '+(activeLocale=='ar'?"ar":'en')}>
                <Col>
                    <Row className='Grey-font' >{t('shipment')} {t('number')} {id}</Row>
                    <Row className='Black-font' style={style}>{state}</Row>
                </Col>
                <Col>
                    <Row className='Grey-font' >{t('last_update')}</Row>
                    <Row className='Black-font'>{lastUpdate}</Row>
                </Col>
                <Col>
                    <Row className='Grey-font' >{t('provider')}</Row>
                    <Row className='Black-font'>{retailer}</Row>
                </Col>
                <Col>
                    <Row className='Grey-font' >{t('estimated_del_date')}</Row>
                    <Row className='Black-font'>{deliveryDate}</Row>
                </Col>
            </Row>
        </div>  
    );
};

export default ShipmentDetailsBar;