import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Badge, Card, CardBody, CardTitle, Col, FormGroup, Label } from 'reactstrap';
import { FaTelegram, FaLinkedin, FaEnvelope } from 'react-icons/fa'; // Import social icons
import { useQuery } from '@tanstack/react-query';
import { Row } from 'react-bootstrap';
import { Linkedin, Mail } from 'react-feather';

const SocialAcc = () => {
  const user = useSelector(state => state.user.selectUser);
  console.log(user);

  // Query for wallet data (not used in the final UI)
  const { data } = useQuery({
    queryKey: ['getWallet'],
    queryFn: () => [], // Placeholder for wallet query (you can ignore this for now)
  });

  // Rendering social media links
  return (
    <div>
      {/* Social Media Accounts Section */}
      <Card className="shadow-sm mb-4">
        <CardBody>
          <CardTitle className="mb-3" tag="h4">اکانت‌های اجتماعی</CardTitle>
          <Row className="d-flex flex-column align-items-start">
            {/* LinkedIn */}
            <Col sm="12" className="mb-3">
              <FormGroup check className="d-flex align-items-center">
                <Label className="me-2"><Linkedin /> : </Label>
                {user.linkdinProfile ? (
                  <a href={user.linkdinProfile} target="_blank" rel="noopener noreferrer">
                    <span>{user.linkdinProfile}</span>
                  </a>
                ) : (
                  <span color="warning">اکانتی وجود ندارد</span>
                )}
              </FormGroup>
            </Col>

            {/* Telegram */}
            <Col sm="12" className="mb-3">
              <FormGroup check className="d-flex align-items-center">
                <Label className="me-2"><FaTelegram size={25} /> : </Label>
                {user.telegramLink ? (
                  <a href={user.telegramLink} target="_blank" rel="noopener noreferrer">
                    <span>{user.telegramLink}</span>
                  </a>
                ) : (
                  <span color="warning">اکانتی وجود ندارد</span>
                )}
              </FormGroup>
            </Col>

            {/* Recovery Email */}
            <Col sm="12" className="mb-3">
              <FormGroup check className="d-flex align-items-center">
                <Label className="me-2"><Mail /> : </Label>
                {user.recoveryEmail ? (
                  <a href={`mailto:${user.recoveryEmail}`}>
                    <span>{user.recoveryEmail}</span>
                  </a>
                ) : (
                  <span color="warning">اکانتی وجود ندارد</span>
                )}
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default SocialAcc;
