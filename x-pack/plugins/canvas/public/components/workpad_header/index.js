/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { compose, withState } from 'recompose';
import { connect } from 'react-redux';
import { canUserWrite } from '../../state/selectors/app';
import { getSelectedPage, isWriteable } from '../../state/selectors/workpad';
import { setWriteable } from '../../state/actions/workpad';
import { addElement } from '../../state/actions/elements';
import { WorkpadHeader as Component } from './workpad_header';

const mapStateToProps = (state) => ({
  isWriteable: isWriteable(state) && canUserWrite(state),
  canUserWrite: canUserWrite(state),
  selectedPage: getSelectedPage(state),
});

const mapDispatchToProps = (dispatch) => ({
  setWriteable: (isWriteable) => dispatch(setWriteable(isWriteable)),
  addElement: (pageId) => (partialElement) => dispatch(addElement(pageId, partialElement)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  addElement: dispatchProps.addElement(stateProps.selectedPage),
  toggleWriteable: () => dispatchProps.setWriteable(!stateProps.isWriteable),
});

export const WorkpadHeader = compose(
  connect(mapStateToProps, mapDispatchToProps, mergeProps),
  withState('showElementModal', 'setShowElementModal', false)
)(Component);
