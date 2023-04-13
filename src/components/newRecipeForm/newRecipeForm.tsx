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
import { Upload } from "lucide-react";
import { useFilePicker } from "use-file-picker";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { uploadMealImage } from "~/server/api/utils";
import { useUser } from "~/providers/AuthContextProvider/AuthContextProvider";
import { toast } from "~/hooks/UseToast";

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
  const userId = useUser().user?.id;

  const { mutateAsync, isLoading } = api.meal.createMeal.useMutation({
    onError: (e) => {
      console.log(e);
    },
  });

  const [
    openFileSelector,
    { filesContent, plainFiles, errors: filePickerErrors },
  ] = useFilePicker({
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

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MealFormValues>();

  console.log(errors);
  console.log(filesContent);
  console.log(filePickerErrors);

  const onSubmit = async (data: MealFormValues) => {
    if (!userId) {
      toast({
        title: "Unauthorized",
        description: "you have to log in",
      });
      return;
    }

    let url = null;

    const file = plainFiles[0];

    if (file) {
      const { error, url: signedURL } = await uploadMealImage(userId, file);

      if (error) {
        toast({
          title: "Uploading error",
          description: error?.message,
        });
      }

      url = signedURL;
    }

    void mutateAsync({ ...data, image_url: url ?? undefined });
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
      <div className="col-span-2 grid items-center gap-1.5">
        <Label>Image</Label>
        <div
          className="flex w-full border-spacing-10 flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 py-20 hover:border-slate-400 hover:bg-slate-50"
          onClick={() => openFileSelector()}
        >
          {filesContent.map((file, index) => (
            <div
              className="rounded-lg border-2 border-slate-300 bg-slate-50 p-6"
              key={index}
            >
              <Image
                alt={file.name}
                src={file.content}
                width={300}
                height={300}
              />
            </div>
          ))}
          <Upload className="h-10 w-10 text-slate-500" />
          <h4 className="mt-2 scroll-m-20 text-lg font-semibold tracking-tight text-slate-500">
            Upload meal image
          </h4>
          <p className="text-sm text-slate-400">select just one file</p>
        </div>
      </div>
      <Button type="submit" className="col-span-2" disabled={isLoading}>
        {isLoading && <Spinner />}
        Submit
      </Button>
    </form>
  );
}
