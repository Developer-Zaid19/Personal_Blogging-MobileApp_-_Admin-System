Bhai `twrnc` me **Tailwind CSS ki saari classes support nahi hoti**, lekin jo React Native me useful hain unka 90% support mil jata hai.

Official docs ka poora dump dena practical nahi hai, lekin ye "most-used cheat sheet" hai jo daily RN development me kaam aayegi:

# Layout

```txt
flex-1
flex-row
flex-col
flex-wrap

items-start
items-center
items-end

justify-start
justify-center
justify-end
justify-between
justify-around
justify-evenly

self-start
self-center
self-end
```

# Width & Height

```txt
w-full
w-1/2
w-1/3
w-2/3

h-full
h-10
h-12
h-16
h-20
h-24

min-h-full
```

# Padding

```txt
p-1
p-2
p-3
p-4
p-5
p-6
p-8

px-2
px-4
px-5
px-6

py-2
py-3
py-4
py-6
```

# Margin

```txt
m-2
m-4
m-6

mt-2
mt-4
mt-6
mt-8
mt-10

mb-2
mb-4
mb-6

ml-2
ml-4

mr-2
mr-4

mx-4
mx-5
my-4
```

# Border Radius

```txt
rounded
rounded-md
rounded-lg
rounded-xl
rounded-2xl
rounded-3xl
rounded-full
```

# Border

```txt
border
border-2

border-white
border-black
border-gray-200
```

# Text Size

```txt
text-xs
text-sm
text-base
text-lg
text-xl
text-2xl
text-3xl
text-4xl
text-5xl
```

# Font Weight

```txt
font-thin
font-light
font-normal
font-medium
font-semibold
font-bold
font-extrabold
font-black
```

# Text Alignment

```txt
text-left
text-center
text-right
```

# Position

```txt
relative
absolute

top-0
bottom-0

left-0
right-0
```

# Overflow

```txt
overflow-hidden
```

# Opacity

```txt
opacity-25
opacity-50
opacity-75
opacity-100
```

# Z Index

```txt
z-0
z-10
z-20
z-30
z-40
z-50
```

# Background Colors

Static colors:

```txt
bg-white
bg-black

bg-gray-100
bg-gray-200
bg-gray-300

bg-red-500
bg-green-500
bg-blue-500

bg-yellow-500
bg-purple-500
```

---

# E-commerce Screen Example

```jsx id="6c5vpo"
<View
  style={[
    tw`flex-1 px-5 pt-6`,
    {
      backgroundColor: colors.background,
    },
  ]}>
  
  <Text
    style={[
      tw`text-3xl font-black`,
      {
        color: colors.textPrimary,
      },
    ]}>
    Discover
  </Text>

  <View
    style={[
      tw`mt-5 p-4 rounded-3xl`,
      {
        backgroundColor: colors.surface,
      },
    ]}>
    <Text
      style={{
        color: colors.textPrimary,
      }}>
      Premium Card
    </Text>
  </View>

</View>
```

# Sabse Useful Rule

Tumhare theme setup ke saath:

```txt
Layout      → twrnc
Spacing     → twrnc
Typography  → twrnc
Colors      → theme.js
```

Yani:

```jsx id="vcv2d7"
tw`flex-row justify-between items-center px-5 mt-6 rounded-3xl`
```

aur

```jsx id="m4fr4g"
backgroundColor: colors.surface
color: colors.textPrimary
```

Ye combo professional React Native apps me bohot clean aur maintainable hota hai.
