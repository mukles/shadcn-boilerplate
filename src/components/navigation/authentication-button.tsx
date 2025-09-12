import { Button } from "@/components/ui/button";
import config from "@/config/config.json";

export default function AuthenticationButton() {
  if (!config.settings.auth.enabled) {
    return null;
  }

  const auth = config.settings.auth;

  return (
    <div className="flex gap-2">
      <Button asChild variant="outline" size="sm">
        <a href={auth.login.url}>{auth.login.title}</a>
      </Button>
      <Button asChild size="sm">
        <a href={auth.signup.url}>{auth.signup.title}</a>
      </Button>
    </div>
  );
}
