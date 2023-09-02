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
import type { diet_type, price_range } from "@prisma/client";
import { api } from "~/utils/api";
import { Spinner } from "../ui/spinner";
import { useFilePicker } from "use-file-picker";
import Image from "next/image";
import { uploadMealImage } from "~/server/api/utils";
import { useToast } from "~/hooks/UseToast";
import { Icon } from "../icons";
import { v4 as uuidv4 } from "uuid";

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
  const mealId = uuidv4();
  const { toast } = useToast();

  const { mutateAsync, isLoading } = api.meal.createMeal.useMutation({
    onSuccess: () => {
      toast({
        title: "Meal created successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error creating meal",
        description: error.message,
      });
    },
  });

  const [openFileSelector, { filesContent, plainFiles, errors }] =
    useFilePicker({
      readAs: "DataURL",
      accept: "image/*",
      multiple: false,
      limitFilesConfig: { max: 1 },
      maxFileSize: 50,
      imageSizeRestrictions: {
        maxHeight: 3000,
        maxWidth: 4000,
        minHeight: 300,
        minWidth: 400,
      },
    });

  const { control, register, handleSubmit } = useForm<MealFormValues>();

  const onSubmit = async (data: MealFormValues) => {
    let url = null;

    const file = plainFiles[0];

    if (file) {
      const { error, url: signedURL } = await uploadMealImage(mealId, file);

      if (error) {
        toast({
          title: "Uploading error",
          description: error?.message,
        });
      }

      url = signedURL;
    }

    void mutateAsync({ ...data, image_url: url ?? undefined, id: mealId });
  };

  return (
    <form
      className="grid w-full grid-cols-4 gap-6"
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit(onSubmit)(e);
      }}
    >
      <div className="col-span-4 grid items-center gap-1.5">
        <Label htmlFor="name">Meal name</Label>
        <Input
          type="text"
          id="name"
          placeholder="Meal name"
          className="w-full"
          {...register("name")}
        />
      </div>
      <div className="col-span-2 grid items-center gap-1.5">
        <Label htmlFor="restaurant">Restaurant</Label>
        <Input
          type="text"
          id="restaurant"
          placeholder="Restaurant"
          {...register("restaurant")}
        />
      </div>

      <div className="col-span-2 grid items-center gap-1.5">
        <Label htmlFor="city">City</Label>
        <Input type="text" id="city" placeholder="City" {...register("city")} />
      </div>

      <div className="col-span-2 grid items-center gap-1.5">
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

      <div className="col-span-2 grid items-center gap-1.5">
        <Label htmlFor="proteins">Proteins / 100g</Label>
        <Input
          type="number"
          id="proteins"
          placeholder="Proteins / 100g"
          {...register("proteins")}
        />
      </div>
      <div className="col-span-2 grid items-center gap-1.5">
        <Label htmlFor="carbs">Carbs / 100g</Label>
        <Input
          type="number"
          id="carbs"
          placeholder="Carbs / 100g"
          {...register("carbs")}
        />
      </div>
      <div className="col-span-2 grid items-center gap-1.5">
        <Label htmlFor="fats">Fats / 100g</Label>
        <Input
          type="number"
          id="fats"
          placeholder="Fats / 100g"
          {...register("fats")}
        />
      </div>
      <div className="col-span-4 grid items-center gap-1.5">
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

      <div className="col-span-4 grid items-center gap-1.5">
        <Label>Image</Label>
        <div
          className="flex w-full border-spacing-10 flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 py-20 hover:border-slate-400 hover:bg-slate-50"
          onClick={() => openFileSelector()}
        >
          {filesContent.map((file) => (
            <div
              className="rounded-lg border-2 border-slate-300 bg-slate-50 p-6"
              key={file.content}
            >
              <Image
                alt={file.name}
                src={file.content}
                width={250}
                height={250}
              />
            </div>
          ))}
          <Icons.upload className="h-10 w-10 text-slate-500" />
          <h4 className="mt-2 scroll-m-20 text-lg font-semibold tracking-tight text-slate-500">
            Upload meal image
          </h4>
          <p className="text-sm text-slate-400">select just one file</p>
        </div>
      </div>
      <Button type="submit" className="col-span-4" disabled={isLoading}>
        {isLoading && <Spinner />}
        Submit
      </Button>
    </form>
  );
}
