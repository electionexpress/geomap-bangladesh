# GeoMap Bangladesh

GeoMap Bangladesh — একটি স্মার্ট বাংলা ম্যাপিং প্ল্যাটফর্ম। GPS লোকেশন, দূরত্ব ও জমির আনুমানিক পরিমাপ, ম্যাপ ভিউ এবং GeoJSON আমদানি/ডাউনলোড সুবিধাসহ একটি উন্মুক্ত ওয়েবসাইট।

## বর্তমান সুবিধা
- OpenStreetMap ভিত্তিক ইন্টার‌্যাক্টিভ ম্যাপ
- ডিভাইসের অনুমতি নিয়ে GPS লোকেশন
- ম্যাপে পয়েন্ট দিয়ে দূরত্ব ও এলাকার আনুমানিক পরিমাপ
- GeoJSON ফাইল আমদানি ও ডাউনলোড
- GitHub Actions-এ push ও pull request-এ smoke test

## স্থানীয়ভাবে পরীক্ষা
Node.js 20 বা পরবর্তী সংস্করণ ব্যবহার করে চালান:

```bash
node scripts/test.js
```

## Render-এ প্রকাশ
রিপোজিটরির `render.yaml` Render Blueprint হিসেবে ব্যবহার করা যায়। Render Static Site তৈরি করার পর GitHub repository-র Settings → Secrets and variables → Actions-এ `RENDER_DEPLOY_HOOK_URL` নামে Render-এর Deploy Hook URL সংরক্ষণ করুন। এরপর `main` branch-এ push হলে GitHub Actions আগে পরীক্ষা চালাবে; পরীক্ষা সফল হলে তবেই Deploy Hook কল করবে। Render-এ এই সাইটের Auto-Deploy বন্ধ রাখুন, যাতে পরীক্ষার আগে আলাদা করে deploy না হয়।

## সীমাবদ্ধতা ও সতর্কতা
GPS নির্ভুলতা ডিভাইস ও পরিবেশের ওপর নির্ভর করে। দূরত্ব/এলাকার ফলাফল মানচিত্রভিত্তিক আনুমানিক হিসাব—আইনি ভূমি জরিপ, সীমানা নির্ধারণ বা দলিলের বিকল্প নয়। ম্যাপ টাইল OpenStreetMap থেকে আসে; তাদের ব্যবহারের নীতিমালা মানতে হবে।
