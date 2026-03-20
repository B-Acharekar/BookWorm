import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PageContainer from '../../components/layout/PageContainer';
import SectionHeader from '../../components/ui/SectionHeader';
import BrutalCard from '../../components/ui/BrutalCard';
import BrutalButton from '../../components/ui/BrutalButton';

const Community = () => {
  const communityLinks = [
    {
      title: "Reddit Subreddit",
      platform: "Reddit",
      description: "Join our official subreddit to discuss your latest reads, share Mumbai book nook spots, and connect with local bibliophiles.",
      url: "https://reddit.com/r/mumbaibooks", // Replace with actual sub
      btnText: "Join Discussion",
      color: "#FF4500"
    },
    {
      title: "Discord Server",
      platform: "Discord",
      description: "Real-time chats, monthly buddy reads, and live digital book clubs. Perfect for night owls and fast readers.",
      url: "https://discord.com",
      btnText: "Enter Server",
      color: "#5865F2"
    }
  ];

  return (
    <PageContainer>
      <SectionHeader 
        title="The Community" 
        subtitle="Connect with the most passionate readers in Mumbai and beyond."
      />

      <Row className="justify-content-center">
        {communityLinks.map((link, index) => (
          <Col lg={6} key={index} className="mb-4">
            <BrutalCard className="h-100 p-4 bg-white border-4 shadow-none">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h2 className="display-6 fw-black text-uppercase m-0">{link.platform}</h2>
                <div 
                  style={{ width: '20px', height: '20px', backgroundColor: link.color }} 
                  className="border border-2 border-dark"
                ></div>
              </div>
              
              <h4 className="fw-bold mb-3">{link.title}</h4>
              <p className="lead fw-bold text-muted mb-5">
                {link.description}
              </p>

              <BrutalButton 
                variant="primary" 
                className="w-100 py-3 text-uppercase fw-black fs-5"
                onClick={() => window.open(link.url, "_blank")}
              >
                {link.btnText}
              </BrutalButton>
            </BrutalCard>
          </Col>
        ))}
      </Row>

      {/* Optional: Call to Action Section */}
      <div className="mt-5 p-5 bg-warning border border-4 border-dark text-center">
        <h3 className="fw-black text-uppercase mb-3">Want to host a meet?</h3>
        <p className="fw-bold mb-4">We help local readers organize offline meetups at Mumbai cafes.</p>
        <BrutalButton variant="dark">Contact Organizers</BrutalButton>
      </div>
    </PageContainer>
  );
};

export default Community;