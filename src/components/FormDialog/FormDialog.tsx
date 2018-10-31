import React, { Component, FormEvent, ReactNode } from 'react'
import Dialog, { DialogProps } from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import withMobileDialog, {
  InjectedProps
} from '@material-ui/core/withMobileDialog'
import FullScreenDialogAppBar from '../FullScreenDialogAppBar'
import Button from '@material-ui/core/Button'

type Props = {
  title: string
  submitLabel?: string
  cancelLabel?: string
  children: ReactNode
  appBarButton?: ReactNode
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  onClose: () => void
} & DialogProps

class FormDialog extends Component<Props> {
  static defaultProps = {
    submitLabel: 'Submit',
    cancelLabel: 'Cancel'
  }

  render() {
    const {
      title,
      submitLabel,
      cancelLabel,
      onSubmit,
      onClose,
      children,
      appBarButton,
      fullScreen,
      ...rest
    } = this.props

    return (
      <Dialog {...rest} onClose={onClose} fullScreen={fullScreen}>
        <form onSubmit={onSubmit} noValidate autoComplete="off">
          {fullScreen && (
            <FullScreenDialogAppBar
              onClose={onClose}
              title={title}
              submitButton={appBarButton}
              submitLabel={submitLabel}
            />
          )}

          <DialogTitle>{title}</DialogTitle>
          <DialogContent>{children}</DialogContent>

          {!fullScreen && (
            <DialogActions>
              <Button onClick={onClose}>{cancelLabel}</Button>
              <Button color="primary" variant="contained" type="submit">
                {submitLabel}
              </Button>
            </DialogActions>
          )}
        </form>
      </Dialog>
    )
  }
}

export default withMobileDialog<Props>()(FormDialog)