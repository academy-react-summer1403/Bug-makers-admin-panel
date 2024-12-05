// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'

// ** Demo Components

import WizardHorizontal from './wizard'

// ** Custom Components
import BreadCrumbs from '@components/breadcrumbs'

const Wizard = () => {
  return (
    <Fragment>
      <BreadCrumbs title='Form Wizard' data={[{ title: 'Form' }, { title: 'Form Wizard' }]} />
      <Row>
        <Col sm='12'>
          <WizardHorizontal />
        </Col>
      </Row>
    </Fragment>
  )
}
export default Wizard
