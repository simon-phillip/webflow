import React from 'react';
import styled from 'styled-components';

interface PromoBannerProps {
  message: string;
  backgroundColor?: string;
  textColor?: string;
  onClose?: () => void;
  isVisible?: boolean;
  defaultPromocode?: string;
}

const BannerContainer = styled.div<{ backgroundColor?: string; isVisible: boolean }>`
  display: ${props => props.isVisible ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  background-color: ${props => props.backgroundColor || '#f8f9fa'};
  width: 100%;
  position: relative;
`;

const BannerMessage = styled.p<{ textColor?: string }>`
  margin: 0;
  color: ${props => props.textColor || '#212529'};
  font-size: 14px;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 16px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: inherit;
  padding: 4px;
  
  &:hover {
    opacity: 0.7;
  }
`;

const PromoBanner: React.FC<PromoBannerProps> = ({
  message,
  backgroundColor,
  textColor,
  onClose,
  isVisible = true,
  defaultPromocode = 'TEST123',
}) => {
  const [promoCode, setPromoCode] = React.useState<string>(defaultPromocode);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlPromoCode = urlParams.get('promocode');
    if (urlPromoCode) {
      setPromoCode(urlPromoCode);
    }
  }, []);

    const formattedMessage = message.replace('{promocode}', promoCode);

  return (
    <BannerContainer backgroundColor={backgroundColor} isVisible={isVisible}>
      <BannerMessage textColor={textColor}>{formattedMessage}</BannerMessage>
      {onClose && (
        <CloseButton onClick={onClose} aria-label="Close banner">
          ×
        </CloseButton>
      )}
    </BannerContainer>
  );
};

export default PromoBanner;
