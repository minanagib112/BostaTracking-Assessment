import ShipmentDetailsTable from "./shipment_details_table";
import { currentPercentage, GetReason } from "../utils/helper";
import ShipmentDetailsBar from "./shipment_details_bar";
import DeliveryAddressCol from "./delivery_address_col";
import ProgressBarTitles from "./progress_bar_titles";
import * as constants from "../utils/constants";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import StepProgressBar from "./progress_bar";
import { Col, Row } from "react-bootstrap";
import React from "react";
import "../App.css";

function ShipmentTrackingPage() {
  let currentstate = null;

  const location = useLocation();

  const { t, i18n } = useTranslation();
  const activeLocale = i18n.resolvedLanguage;

  const data = location.state.data;
  const id = location.state.searchID;

  const date =
    data["CurrentStatus"] && data["CurrentStatus"]["timestamp"]
      ? new Date(data["CurrentStatus"]["timestamp"])
      : null;
  const formattedDate = date ? date.toLocaleDateString() : "-";

  var deldate = new Date(data["PromisedDate"]);
  var deliveryDate;

  if (data["PromisedDate"] == null) {
    deliveryDate = "-";
  } else {
    deliveryDate = deldate.toLocaleDateString();
  }

  const provider = data["provider"];

  var percent = data["TransitEvents"]
    ? currentPercentage(data["TransitEvents"])
    : 0;

  var reason = null;
  var color = constants.YELLOW_COLOR;
  if (data["CurrentStatus"]) {
    switch (data["CurrentStatus"]["state"]) {
      case "DELIVERED":
        currentstate = t("Delivered");
        color = constants.GREEN_COLOR;
        break;
      case "CANCELLED":
        color = constants.RED_COLOR;
        currentstate = t("Cancelled");
        break;
      default:
        color = constants.YELLOW_COLOR;
        currentstate = t("NotDelivered");
        reason = GetReason(data["TransitEvents"]);
        break;
    }
  } else {
    currentstate = "Unknown";
  }

  return (
    <body className="App-body">
      <Row>
        <Col className="Grey-border">
          <ShipmentDetailsBar
            color={color}
            id={id}
            state={currentstate}
            lastUpdate={formattedDate}
            deliveryDate={deliveryDate}
            retailer={provider}
          />
          <Row className="Progress-row">
            <StepProgressBar color={color} percent={percent} />
            <ProgressBarTitles percent={percent} error={reason} color={color} />
          </Row>
        </Col>
      </Row>
      <Row
        className="Small-titles"
        style={
          activeLocale === "ar" ? { textAlign: "right" } : { textAlign: "left" }
        }
      >
        <Col
          style={{ width: "66%", fontSize: " calc(4px + 2vmin)" }}
          className="Black-font"
        >
          {t("shipment")} {t("details")}
        </Col>
        <Col
          style={{ width: "34%", fontSize: " calc(4px + 2vmin)" }}
          className="Black-font"
        >
          {t("delivery")} {t("address")}
        </Col>
      </Row>
      <Row style={{ display: "flex", flexDirection: "row" }}>
        <Col style={{ width: "66%" }}>
          <ShipmentDetailsTable data={data["TransitEvents"] || []} />
        </Col>
        <Col style={{ width: "34%", wordWrap: "break-word" }}>
          <DeliveryAddressCol />
        </Col>
      </Row>
    </body>
  );
}

export default ShipmentTrackingPage;
