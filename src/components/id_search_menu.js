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

function IDSearchMenu () {
  
  const { t, i18n} = useTranslation();
  const activeLocale = i18n.resolvedLanguage;

  const navigate = useNavigate();
  
  const [searchID, setSearchID] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  
  const { data, status, error } = useSelector((state) => state.shipment);
  
  let content=<div>{error}</div>

  const dispatch = useDispatch();
  useEffect(() => {
    if (isDataLoaded) {
      if (status === actionType.FETCH_DATA_LOADING) {  
        content = <Spinner text={t("loading")+"..."} />
      } 
      else if (status === actionType.FETCH_DATA_SUCCESS) {
        navigate("/tracking", {state:{data, searchID}});
      } 
      else if (status === actionType.FETCH_DATA_ERROR) {
        content = <div>{error}</div>
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
    <div className='menu' style={activeLocale=='ar'?{left: "20vw", textAlign:"right"}:{left: "64vw"}}>   
      <form onSubmit={handleSubmit}>
          <Col className='Search-col'>
            <p className='Search-title'>{t("t_your_s")}</p>
            <Row className='Search-bar-row'>
              <input placeholder={t("trk_id")} maxLength={25} onChange={handleChange} value={searchID} id="id" className={activeLocale=='ar'?'small-ar-search-bar': "small-en-search-bar"}/>
              <button type="submit" className='Search-bar-button'><FontAwesomeIcon className='Search-icon' icon={faMagnifyingGlass} /></button>
            </Row>
          </Col>
        </form>
    </div>
  );
};

export default IDSearchMenu;