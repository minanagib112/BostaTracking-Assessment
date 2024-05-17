import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {fetchThunkShipment} from '../app/shipment_slice';
import {useSelector, useDispatch } from 'react-redux';
import {React,useState, useEffect} from 'react';
import * as actionType from '../app/actionType';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {Col, Row } from 'react-bootstrap';
import Spinner from './spinner';
import './id_search_menu.css';
import './welcome_page.css';
import '../App.css';

function WelcomePage () {

  const { t, i18n} = useTranslation();
  const activeLocale = i18n.resolvedLanguage;
  
  const navigate = useNavigate();
  
  const [searchID, setSearchID] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  
  const { data, status, error } = useSelector((state) => state.shipment);
  const dispatch = useDispatch();
  
  let content=<p>{error}</p>;
  
  useEffect(() => {
    if (isDataLoaded) {
      if (status === actionType.FETCH_DATA_LOADING) {
        content = <Spinner text="Loading..." />
      } 
      else if (status === actionType.FETCH_DATA_SUCCESS) {
        navigate("/tracking", {state:{data, searchID}});
      } 
      else if (status === actionType.FETCH_DATA_ERROR) {
        content = <p>{error}</p>
      }
    }
  }, [data, isDataLoaded]);

  const handleChange = (event) => {
    setSearchID(event.target.value);
  }


  const handleSubmit =async (event) => {
    event.preventDefault();
    
    dispatch(fetchThunkShipment(searchID))
      .then(() => setIsDataLoaded(true)) 
      .catch((error) => console.error('Error fetching data:', error));
  
  }

  return (
    <body className='App-body'>
      <Col>
        <form onSubmit={handleSubmit}>
          <Col className='Welcome-col'>
            <p className='Welcome-title'>{t('welcome')}</p>
            <p className='Welcome-search-title'>{t('t_your_s')}!</p>
            <Row className='Search-bar-row Welcome-Search-bar-row'>
              <input placeholder={t("trk_id")} maxLength={25} onChange={handleChange} value={searchID} id="id" className={"Search-bar " + (activeLocale=='ar'?"ar-search-bar":"en-search-bar")}/>
              <button type="submit" className={(activeLocale=='ar'?"ar-search-button":"en-search-button")}><FontAwesomeIcon className='Welcome-Search-icon' icon={faMagnifyingGlass} /></button>
            </Row>
            {content}
          </Col>
        </form> 
      </Col>
    </body>
  );
};

export default WelcomePage;