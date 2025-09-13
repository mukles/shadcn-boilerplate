import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // TODO: Add registration logic here
    alert("Registered successfully!\n" + JSON.stringify(data, null, 2));
  };

  return (
    <section className="bg-muted h-screen">
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-6 lg:justify-start">
          <Logo />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border-muted bg-background flex w-full max-w-sm min-w-sm flex-col items-center gap-y-4 rounded-md border px-6 py-8 shadow-md"
          >
            <h1 className="text-xl font-semibold">Register</h1>
            <Input
              type="text"
              placeholder="Name"
              className="text-sm"
              {...register("name", { required: "Name is required" })}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="w-full text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
            <Input
              type="email"
              placeholder="Email"
              className="text-sm"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "Invalid email address",
                },
              })}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="w-full text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
            <Input
              type="password"
              placeholder="Password"
              className="text-sm"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <p className="w-full text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
          <div className="text-muted-foreground flex justify-center gap-1 text-sm">
            <p>Already have an account?</p>
            <a
              href={"/login"}
              className="text-primary font-medium hover:underline"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
