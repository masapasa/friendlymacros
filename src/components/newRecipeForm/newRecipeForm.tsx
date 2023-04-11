import { Label } from "@radix-ui/react-label";
import { Input } from "~/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { diet_type, price_range } from "@prisma/client";
import { api } from "~/utils/api";
import { Spinner } from "../ui/spinner";

export const mealValidationSchema = Yup.object({
  name: Yup.string().required().min(3).max(100),
  restaurant: Yup.string().required().min(3).max(100),
  city: Yup.string().required().min(3).max(100),
  diet: Yup.string()
    .required()
    .oneOf(["normal", "vegan", "keto", "lowcarb", "gluten_free", "paleo"]),
  priceRange: Yup.string().required().oneOf(["avarage", "cheap", "expensive"]),
  proteins: Yup.number().required().min(0).max(100),
  carbs: Yup.number().required().min(0).max(100),
  fats: Yup.number().required().min(0).max(100),
});

interface MealFormValues {
  name: string;
  restaurant: string;
  city: string;
  diet: diet_type;
  priceRange: price_range;
  proteins: number;
  carbs: number;
  fats: number;
}

export function NewMealForm() {
  const { mutateAsync, isLoading } = api.meal.createMeal.useMutation({
    onError: (e) => {
      console.log(e);
    },
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MealFormValues>();

  console.log(errors);

  const onSubmit = (data: MealFormValues) => {
    console.log(data);
    void mutateAsync(data);
  };

  return (
    <form
      className="grid w-full grid-cols-2 gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit(onSubmit)(e);
      }}
    >
      <div className="grid max-w-sm items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" placeholder="Name" {...register("name")} />
      </div>

      <div className="grid max-w-sm items-center gap-1.5">
        <Label htmlFor="restaurant">Restaurant</Label>
        <Input
          type="text"
          id="restaurant"
          placeholder="Restaurant"
          {...register("restaurant")}
        />
      </div>

      <div className="grid max-w-sm items-center gap-1.5">
        <Label htmlFor="city">City</Label>
        <Input type="text" id="city" placeholder="City" {...register("city")} />
      </div>

      <div className="grid max-w-sm items-center gap-1.5">
        <Label htmlFor="proteins">Proteins / 100g</Label>
        <Input
          type="number"
          id="proteins"
          placeholder="Proteins / 100g"
          {...register("proteins")}
        />
      </div>

      <div className="grid max-w-sm items-center gap-1.5">
        <Label htmlFor="carbs">Carbs / 100g</Label>
        <Input
          type="number"
          id="carbs"
          placeholder="Carbs / 100g"
          {...register("carbs")}
        />
      </div>
      <div className="grid max-w-sm items-center gap-1.5">
        <Label htmlFor="fats">Fats / 100g</Label>
        <Input
          type="number"
          id="fats"
          placeholder="Fats / 100g"
          {...register("fats")}
        />
      </div>

      <div className="grid max-w-sm items-center gap-1.5">
        <Label htmlFor="diet">Diet type</Label>
        <Controller
          control={control}
          name="diet"
          render={({ field: { onChange, value } }) => (
            <Select onValueChange={onChange} value={value}>
              <SelectTrigger>
                <SelectValue placeholder="Diet type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">normal</SelectItem>
                <SelectItem value="keto">keto</SelectItem>
                <SelectItem value="paleo">paleo</SelectItem>
                <SelectItem value="vegan">vegan</SelectItem>
                <SelectItem value="lowcarb">lowcarb</SelectItem>
                <SelectItem value="gluten_free">gluten free</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="grid max-w-sm items-center gap-1.5">
        <Label htmlFor="priceRange">Price Range</Label>
        <Controller
          control={control}
          name="priceRange"
          render={({ field: { onChange, value } }) => (
            <Select onValueChange={onChange} value={value}>
              <SelectTrigger>
                <SelectValue placeholder="Price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">normal</SelectItem>
                <SelectItem value="cheap">cheap</SelectItem>
                <SelectItem value="expensive">expensive</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <Button type="submit" className="col-span-2" disabled={isLoading}>
        {isLoading && <Spinner />}
        Submit
      </Button>
    </form>
  );
}
