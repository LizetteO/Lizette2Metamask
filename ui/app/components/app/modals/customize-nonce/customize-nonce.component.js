import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from '../../modal';
import TextField from '../../../ui/text-field';
import Button from '../../../ui/button';
import Typography from '../../../ui/typography';
import {
  COLORS,
  TYPOGRAPHY,
  FONT_WEIGHT,
} from '../../../../helpers/constants/design-system';

export default class CustomizeNonce extends PureComponent {
  static propTypes = {
    hideModal: PropTypes.func.isRequired,
    customNonceValue: PropTypes.string,
    nextNonce: PropTypes.number,
    updateCustomNonce: PropTypes.func,
    getNextNonce: PropTypes.func,
  };

  static contextTypes = {
    t: PropTypes.func,
  };

  state = {
    customNonceValue: '',
  };

  onChange = (e) => {
    this.setState({
      customNonceValue: e.target.value,
    });
  };

  onSubmit = () => {
    const { customNonceValue } = this.props;
    if (this.state.customNonceValue === '') {
      this.props.updateCustomNonce(customNonceValue);
    } else {
      this.props.updateCustomNonce(this.state.customNonceValue);
    }
    this.props.getNextNonce();
    this.props.hideModal();
  };

  onReset = () => {
    const { nextNonce } = this.props;
    this.setState({
      customNonceValue: nextNonce,
    });
    document.getElementById('custom-nonce-id').value = nextNonce;
  };

  renderModalContent() {
    const { t } = this.context;
    const { hideModal, nextNonce, customNonceValue } = this.props;
    return (
      <div className="customize-nonce-modal">
        <div className="customize-nonce-modal__main-header">
          <Typography variant={TYPOGRAPHY.H4} fontWeight={FONT_WEIGHT.BOLD}>
            {t('editNonceField')}
          </Typography>
          <button
            className="fas fa-times customize-nonce-modal__close"
            title={t('close')}
            onClick={hideModal}
          />
        </div>
        <div className="customize-nonce-modal__description">
          <Typography
            variant={TYPOGRAPHY.H6}
            fontWeight={FONT_WEIGHT.NORMAL}
            tag="span"
          >
            {t('editNonceMessage')}
          </Typography>
          <Typography
            className="cursor-pointer"
            variant={TYPOGRAPHY.H6}
            fontWeight={FONT_WEIGHT.NORMAL}
            color={COLORS.PRIMARY1}
            tag="span"
          >
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://metamask.zendesk.com/hc/en-us/articles/360015489251"
            >
              {t('learnMore')}
            </a>
          </Typography>
        </div>
        <div className="customize-nonce-modal__content">
          <div className="customize-nonce-modal__header">
            <Typography variant={TYPOGRAPHY.H6} fontWeight={FONT_WEIGHT.BOLD}>
              {t('editNonceField')}
            </Typography>
            <Button
              type="link"
              className="customize-nonce-modal__reset"
              onClick={this.onReset}
            >
              {t('reset')}
            </Button>
            {/* <span
              className="customize-nonce-modal__reset"
              onClick={this.onReset}
            >
              {t('reset')}
            </span> */}
          </div>
          <div className="customize-nonce-modal__input">
            <TextField
              type="number"
              min="0"
              placeholder={
                customNonceValue ||
                (typeof nextNonce === 'number' && nextNonce.toString())
              }
              onChange={this.onChange}
              fullWidth
              margin="dense"
              value={this.state.customNonceValue}
              id="custom-nonce-id"
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { t } = this.context;
    const { hideModal } = this.props;

    return (
      <Modal
        onSubmit={this.onSubmit}
        submitText={t('save')}
        submitType="primary"
        onCancel={() => hideModal()}
        cancelText={t('cancel')}
        cancelType="secondary"
        rounded
        contentClass="customize-nonce-modal-content"
        containerClass="customize-nonce-modal-container"
      >
        {this.renderModalContent()}
      </Modal>
    );
  }
}
