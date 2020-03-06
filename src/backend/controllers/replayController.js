// @flow strict

// Required imports
import { validationResult } from 'express-validator';
import type { $Request, $Response } from 'express';

import User from '../../models/userModel';
import Tank from '../../models/tankModel';
