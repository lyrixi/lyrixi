import _Loading from './Loading'
import SpinFade from './SpinFade'
import Ouroboros from './Ouroboros'
import BallWave from './BallWave'
import open from './api/open'
import close from './api/close'
import exists from './api/exists'

import type { LoadingComponents } from './types/Loading.modules.types'

const Loading = _Loading as LoadingComponents
Loading.SpinFade = SpinFade
Loading.Ouroboros = Ouroboros
Loading.BallWave = BallWave
Loading.open = open
Loading.close = close
Loading.exists = exists

export default Loading
