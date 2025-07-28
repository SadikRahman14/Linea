import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import Background from '../../assets/login-vector.png'

function Auth() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    
    const handleLogin  = async () => {};
    const handleSignup = async () => {};

  return (
    <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
        <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
            <div className="flex flex-col gap-10 items-center justify-center">
                <div className="flex items-center justify-center flex-col">
                    <div className='flex items-center justify-center'>
                        <h1 className='text-5xl font-bold border-b-2 md:text-6xl'> W e l c o m e </h1>
                    </div>
                    <p className="font-medium text-center">
                        Conect.Share.Chat
                    </p>
                </div>
                <div className="flex items-center justify-center w-full">
                    <Tabs className='w-3/4'>
                        <TabsList className="flex bg-transparent rounded-none w-full">
                            <TabsTrigger value="login"
                            className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]: font-semibold
                             data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">
                                Login
                            </TabsTrigger>
                            <TabsTrigger value = "signup"
                            className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]: font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">
                                Signup
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="login"
                        className="flex flex-col gap-5 mt-10">
                            <Input
                                placeholder = "Email"
                                type="email"
                                className="rounded-full p-6"
                                value={email}
                                onChange = {(e) => setEmail(e.target.value)}
                            />
                            <Input
                                placeholder = "Password"
                                type="password"
                                className="rounded-full p-6"
                                value={password}
                                onChange = {(e) => setPassword(e.target.value)}
                            />
                            <Button 
                                className="rounded-full p-6"
                                onclick={handleLogin}
                                > L O G I N 
                            </Button>
                        </TabsContent>
                        <TabsContent value="signup"
                        className="flex flex-col gap-5">
                            <Input
                                placeholder = "Email"
                                type="email"
                                className="rounded-full p-6"
                                value={email}
                                onChange = {(e) => setEmail(e.target.value)}
                            />
                            <Input
                                placeholder = "Password"
                                type="password"
                                className="rounded-full p-6"
                                value={password}
                                onChange = {(e) => setPassword(e.target.value)}
                            />
                            <Input
                                placeholder = "Confirm Password"
                                type="password"
                                className="rounded-full p-6"
                                value={confirmPassword}
                                onChange = {(e) => setConfirmPassword(e.target.value)}
                            />
                            <Button 
                                className="rounded-full p-6"
                                onclick={handleSignup}
                                > S I G N U P 
                            </Button>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            <div className="hidden xl:flex justify-center items-center">
                <img src={Background} alt="Login Background" className='h-[500px]'/>
            </div>
        </div>
    </div>
  )
}

export default Auth