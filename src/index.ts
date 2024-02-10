import express, { Request, Response } from 'express';
import 'dotenv/config';
import Connection from './helpers/connection';

const ConnectionService = new Connection(express);

ConnectionService.startup();