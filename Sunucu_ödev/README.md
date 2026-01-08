# Car Rental API

Profesyonel Araç Kiralama Sistemi için geliştirilmiş RESTful API. Node.js ve Express ile MVC mimarisi kullanılarak hazırlanmıştır.

## Kurulum (Installation)

1. Projeyi indirin.
2. Bağımlılıkları yükleyin:
    ```bash
    npm install
    ```
3. Uygulamayı başlatın:
    ```bash
    npm start
    ```
    Sunucu `http://localhost:3000` adresinde çalışacaktır.

## API Endpoint Listesi

| Method | Endpoint | Açıklama |
| :--- | :--- | :--- |
| `GET` | `/api/cars` | Tüm araçları listeler |
| `POST` | `/api/cars` | Yeni araç ekler |
| `PUT` | `/api/cars/:id` | Araç bilgilerini günceller |
| `DELETE` | `/api/cars/:id` | Aracı siler |
| `POST` | `/api/cars/:id/rent` | Aracı kiralar (isAvailable -> false) |

## İş Kuralları (Business Logic)

1. **Kiralama Kısıtlaması**: `rentCar` fonksiyonunda, eğer araç müsait değilse (`isAvailable: false`), kiralama işlemi reddedilir ve `400 Bad Request` döner.
2. **Fiyat Kısıtlaması**: `updateCar` fonksiyonunda, 2020 modelden eski araçların günlük fiyatı 2000 TL üzerine çıkarılamaz.

## Veritabanı İlişkileri (ER Diyagramı Açıklaması)

Bu proje in-memory veri kullanmaktadır ancak gerçek bir senaryoda ilişkisel veritabanı (SQL) için önerilen yapı şöyledir:

- **Cars (Araçlar)**
    - `id` (PK)
    - `brand`
    - `model`
    - `year`
    - `daily_price`
    - `is_available`
    
- **Customers (Müşteriler)**
    - `id` (PK)
    - `name`
    - `email`
    - `license_number`

- **Rentals (Kiralamalar)**
    - `id` (PK)
    - `car_id` (FK -> Cars.id)
    - `customer_id` (FK -> Customers.id)
    - `rent_date`
    - `return_date`
    - `total_price`

*İlişki Türü:* Bir araç birçok kez kiralanabilir (One-to-Many), bir müşteri birçok araç kiralayabilir (One-to-Many). Rentals tablosu bu ilişkiyi sağlar.
