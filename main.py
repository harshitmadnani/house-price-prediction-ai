from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("xgboost_model.pkl")


class HouseInput(BaseModel):
    longitude: float
    latitude: float
    housing_median_age: float
    total_rooms: float
    total_bedrooms: float
    population: float
    households: float
    median_income: float

    ocean_proximity_INLAND: int
    ocean_proximity_ISLAND: int
    ocean_proximity_NEAR_BAY: int
    ocean_proximity_NEAR_OCEAN: int

    rooms_per_household: float
    bedrooms_per_room: float
    population_per_household: float


@app.get("/")
def home():
    return {"message": "House Price Prediction API is running"}


@app.post("/predict")
def predict(data: HouseInput):

    input_data = np.array([[

        data.longitude,
        data.latitude,
        data.housing_median_age,
        data.total_rooms,
        data.total_bedrooms,
        data.population,
        data.households,
        data.median_income,

        data.ocean_proximity_INLAND,
        data.ocean_proximity_ISLAND,
        data.ocean_proximity_NEAR_BAY,
        data.ocean_proximity_NEAR_OCEAN,

        data.rooms_per_household,
        data.bedrooms_per_room,
        data.population_per_household

    ]])

    prediction = model.predict(input_data)

    return {
        "predicted_price": float(prediction[0])
    }