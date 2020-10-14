---
title: "GETApp Fradeani"
date: "2016-11-02"
description: "The Guided Esthetic Treatment app is intended to guide the dentist through each step of the prosthetic treatment plan"
tags: "ios swift xcode coredata uikit"
icon: "./icon.png"
url: "https://www.getappfradeani.com/"
---

I developed the native iOS app using the Swift Language, Core Data, and UIKit. The core of this app is a dynamic set of linked forms. The following list is a requirements overview.

1. Each form is displayed only if the data on the previously completed forms meets some pre-conditions.
2. A form may depend on the data of some fields on previously filled in forms.
3. Each form needs to be validated before proceeding to the next form.
4. If updating an intermediate form, proceeding to the next step requires a cascade update.

The solution I found is a completely platform independent recursive algorithm - we used the same algorithm for the Android app.
