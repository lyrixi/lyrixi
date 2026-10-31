import type Form from '../Form'
import type Field from '../Field'
import type Item from '../Item'
import type Label from '../Label'

export type FormComponents = typeof Form & {
  Item: typeof Item
  Label: typeof Label
  Field: typeof Field
}
