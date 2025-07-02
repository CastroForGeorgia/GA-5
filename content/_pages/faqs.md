---
title: "Frequently Asked Questions"
permalink: /faqs/
description: "Get answers to common questions about Andres Castro and his campaign for Georgia's 5th Congressional District."
---

## Frequently Asked Questions

Get to know Andres Castro and his commitment to creating a fairer, more inclusive community in Georgia's 5th Congressional District.

{% assign faqs = site.faqs | sort: "order" %}
{% for faq in faqs %}
<div class="faq-item">
  <h3><a href="{{ faq.url }}">{{ faq.title }}</a></h3>
  <p>{{ faq.content | strip_html | truncatewords: 30 }}</p>
  <a href="{{ faq.url }}" class="read-more">Read full answer →</a>
</div>
{% endfor %} 