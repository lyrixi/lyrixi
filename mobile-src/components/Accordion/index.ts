import _Accordion from './Accordion'
import AccordionGroup from './AccordionGroup'

import type { AccordionComponents } from './types/Accordion.modules.types'

const Accordion = _Accordion as AccordionComponents
Accordion.Group = AccordionGroup

export default Accordion
