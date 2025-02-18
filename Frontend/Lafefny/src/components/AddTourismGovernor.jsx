import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { addTourismGovernor } from '../services/adminService';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import Navigation from '../components/Navigation';

const AddTourismGovernor = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.username || !userData.password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields."
      });
      return;
    }

    try {
      await addTourismGovernor(userData);
      toast({
        title: "Success",
        description: "Tourism Governor added successfully."
      });
      setUserData({
        username: '',
        password: '',
      });
    } catch (error) {
      console.error('Error adding Tourism Governor:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add Tourism Governor."
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-1 lg:px-0">
      

        <div className="lg:p-8">
        <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-4 md:mb-0 hover:translate-x-1 transition-transform"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Add Tourism Governor
              </h1>
              <p className="text-sm text-muted-foreground">
                Create a new Tourism Governor account
              </p>
            </div>

            <div className="grid gap-6">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      name="username"
                      value={userData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      value={userData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button type="submit">
                    Add Tourism Governor
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTourismGovernor;