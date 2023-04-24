import { Response, Request, NextFunction } from 'express';
import { Cities, CityWithId } from '../model/costModel';
import { CityCostsRequest, CityValidation } from '../interface/Validations';


export async function getCities(req: Request, res: Response<CityWithId[]>, next: NextFunction) {
    try {
        const result = await Cities.find().toArray();
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export async function getCity(req: Request<{}, CityWithId, CityValidation>, res: Response<CityWithId>, next: NextFunction) {
    try {
        const cityRequest = req.body.city.toLocaleLowerCase();
        const result = await getCityFromDatabase(cityRequest) as CityWithId;
        if (!result) {
            res.status(404);
            throw new Error(`Did not find city for search string: "${cityRequest}".`);
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export async function getPrice(req: Request<{}, number, CityCostsRequest>, res: Response, next: NextFunction) {
    try {
        const cityRequest = req.body.city.toLocaleLowerCase();
        const cityPrice = await getCityFromDatabase(cityRequest) as CityWithId;
        if (!cityPrice) {
            res.send(404);
            throw new Error(`Did not find city for search string: ${cityRequest}.`);
        }
        const result = calculatePrice(req.body, cityPrice);
        res.json(result);
    } catch (error) {
        next(error);
    }
}

async function getCityFromDatabase(citySearch: string){
    const result = await Cities.findOne({
        city: citySearch,
    });
    return result;
}

function calculatePrice(cityPriceRequest: CityCostsRequest, cityPrice: CityWithId): number{
    const squareMeter = cityPriceRequest.price_per_square_meter * cityPrice.price_per_square_meter;
    const windowCleaning = cityPriceRequest.window_cleaning ? cityPrice.window_cleaning : 0;
    const balconyCleaning = cityPriceRequest.balcony_cleaning ? cityPrice.balcony_cleaning : 0;
    const removalOfGarbage = cityPriceRequest.removal_of_garbage && cityPrice.city === 'uppsala' ? cityPrice.removal_of_garbage : undefined;

    const price = squareMeter + windowCleaning + balconyCleaning + (removalOfGarbage || 0);
    return price;
}