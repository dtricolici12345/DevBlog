import { body} from 'express-validator';

export const loginValidation = [
    body('email', 'Invailed email format').isEmail(), 
    body('password','Password must be at least (characters long').isLength({min: 5 }),
];

export const registerValidation = [
    body('email', 'Invailed email format').isEmail(), 
    body('password','Password must be at least (characters long').isLength({min: 5 }),
    body('fullName','Please enter a name').isLength({min: 3 }),
    body('favatarUrl','Invalid avatar link').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Enter article title').isLength({min: 3 }).isString(), 
    body('text','Enter article text').isLength({min: 10 }).isString(),
    body('tags','Incorrect tag format.').optional().isArray(),
    body('ImageUrl','incorrect link to their image').optional().isString(),
];



