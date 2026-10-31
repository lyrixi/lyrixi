import BallWave from '../BallWave'
import exists from '../api/exists'
import close from '../api/close'
import Loading from '../Loading'
import Ouroboros from '../Ouroboros'
import open from '../api/open'
import SpinFade from '../SpinFade'

export type LoadingComponents = typeof Loading & {
  SpinFade: typeof SpinFade
  Ouroboros: typeof Ouroboros
  BallWave: typeof BallWave
  open: typeof open
  close: typeof close
  exists: typeof exists
}
