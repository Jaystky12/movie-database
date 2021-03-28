import { app } from './connections'
import passport from 'passport'
import { FacebookStrategy } from './strategies/FacebookStrategy'

passport.use(FacebookStrategy)