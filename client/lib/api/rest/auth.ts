import {apiAuth} from ".";


export async function isEmailTaken(email: string) {
  const emails: string[] = []
  const exists = emails.includes(email)
  return !exists;
}

export async function sendVerificationCode(email: string) {
  return await apiAuth.post("/auth/send-verification-code", { email })
}

export async function emailVerification(body: { email: string, code: string }) {
  return await apiAuth.post("/auth/email-verification", body)

}

export async function signUp(body: { email: string, name: string, password: string, verification_token: string }) {
  return await apiAuth.post("/auth/sign-up", body)

}

export async function signIn(body: { email: string, password: string  }) {
  return await apiAuth.post("/auth/sign-in", body)

}