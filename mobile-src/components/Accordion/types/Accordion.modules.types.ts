import Accordion from '../Accordion'
import AccordionGroup from '../AccordionGroup'

export type AccordionComponents = typeof Accordion & {
  Group: typeof AccordionGroup
}
