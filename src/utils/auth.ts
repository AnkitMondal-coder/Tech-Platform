import { supabase } from '../lib/supabase';
import bcrypt from 'bcryptjs';
import Cookies from 'js-cookie';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  preferred_currency: string;
  country: string;
  last_login: string;
}

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const signUp = async (email: string, password: string, name: string, country: string = 'US') => {
  try {
    const hashedPassword = await hashPassword(password);
    
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          email,
          password_hash: hashedPassword,
          name,
          country,
          preferred_currency: getCurrencyByCountry(country),
          last_login: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) throw error;
    
    const authUser: AuthUser = {
      id: data.id,
      email: data.email,
      name: data.name,
      preferred_currency: data.preferred_currency,
      country: data.country,
      last_login: data.last_login
    };
    
    Cookies.set('auth_user', JSON.stringify(authUser), { expires: 7 });
    return { user: authUser, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) {
      throw new Error('Database error occurred');
    }

    if (!data) {
      throw new Error('Invalid email or password');
    }

    const isValidPassword = await verifyPassword(password, data.password_hash);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Update last login
    await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', data.id);

    const authUser: AuthUser = {
      id: data.id,
      email: data.email,
      name: data.name,
      preferred_currency: data.preferred_currency,
      country: data.country,
      last_login: new Date().toISOString()
    };
    
    Cookies.set('auth_user', JSON.stringify(authUser), { expires: 7 });
    return { user: authUser, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const signOut = () => {
  Cookies.remove('auth_user');
};

export const getCurrentUser = (): AuthUser | null => {
  const userCookie = Cookies.get('auth_user');
  if (userCookie) {
    try {
      return JSON.parse(userCookie);
    } catch {
      return null;
    }
  }
  return null;
};

export const getCurrencyByCountry = (country: string): string => {
  const currencyMap: { [key: string]: string } = {
    'US': 'USD',
    'IN': 'INR',
    'GB': 'GBP',
    'DE': 'EUR',
    'FR': 'EUR',
    'IT': 'EUR',
    'ES': 'EUR',
    'CA': 'CAD',
    'AU': 'AUD',
    'JP': 'JPY',
    'CN': 'CNY',
    'BR': 'BRL',
    'MX': 'MXN',
    'NG': 'NGN',
    'EG': 'EGP',
    'ZA': 'ZAR',
    'KE': 'KES',
    'GH': 'GHS',
    'PS': 'USD', // Palestine
    'SY': 'USD', // Syria
    'SO': 'USD'  // Somalia
  };
  
  return currencyMap[country] || 'USD';
};