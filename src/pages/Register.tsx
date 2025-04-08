import { RegisterForm } from "@/components/Auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-lv-gold/10 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif text-lv-brown mb-2">Luxe Ledger</h1>
          <p className="text-muted-foreground">Your premium retail management solution</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
} 