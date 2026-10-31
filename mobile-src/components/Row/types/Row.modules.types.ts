import Col from '../Col'
import Row from '../Row'

export type RowComponents = typeof Row & { Col: typeof Col }
